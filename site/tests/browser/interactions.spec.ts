import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('/interactions')
})

test('keyboard toggles single items without closing independent groups', async ({
  page,
}) => {
  await expect(page.getByText('First answer', {exact: true})).toBeVisible()
  const summary = page.getByText('Second question', {exact: true})
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByText('Second answer', {exact: true})).toBeVisible()
  await expect(page.getByText('First answer', {exact: true})).toBeHidden()
  await expect(
    page.getByText('Independent answer', {exact: true}),
  ).toBeVisible()
  await page.keyboard.press('Space')
  await expect(page.getByText('Second answer', {exact: true})).toBeHidden()
  await page.getByText('Multiple second', {exact: true}).click()
  await expect(
    page.getByText('Multiple first answer', {exact: true}),
  ).toBeVisible()
  await expect(
    page.getByText('Multiple second answer', {exact: true}),
  ).toBeVisible()
})

test('modal traps focus, syncs Escape and restores trigger focus on repeated opens', async ({
  page,
}) => {
  const trigger = page.getByRole('button', {name: 'Open modal', exact: true})
  const dialog = page.getByRole('dialog', {name: 'Example modal'})
  for (let cycle = 0; cycle < 2; cycle++) {
    await trigger.click()
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleDescription('Example description')
    await expect(
      dialog.getByRole('button', {name: 'Close', exact: true}),
    ).toBeFocused()
    await trigger.focus()
    await expect(
      dialog.getByRole('button', {name: 'Close', exact: true}),
    ).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(
      dialog.getByRole('textbox', {name: 'Modal input'}),
    ).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(
      dialog.getByRole('button', {name: 'Close', exact: true}),
    ).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page.getByLabel('Modal state')).toHaveText('closed')
    await expect(trigger).toBeFocused()
  }
  await trigger.click()
  await dialog.getByRole('button', {name: 'Close', exact: true}).click()
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('backdrop dismissal is opt in and clicks inside do not dismiss', async ({
  page,
}) => {
  await page.getByRole('button', {name: 'Open modal', exact: true}).click()
  const dialog = page.getByRole('dialog', {name: 'Example modal'})
  await page.mouse.click(2, 2)
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByLabel('Dismiss on backdrop').check()
  await page.getByRole('button', {name: 'Open modal', exact: true}).click()
  await dialog.getByRole('heading').click()
  await expect(dialog).toBeVisible()
  await page.mouse.click(2, 2)
  await expect(dialog).toBeHidden()
})

test('dragging from inside the dialog onto its backdrop does not dismiss', async ({
  page,
}) => {
  await page.getByLabel('Dismiss on backdrop').check()
  await page.getByRole('button', {name: 'Open modal', exact: true}).click()
  const dialog = page.getByRole('dialog', {name: 'Example modal'})
  const bounds = await dialog.boundingBox()
  if (!bounds) throw new Error('Expected the open dialog to have bounds')
  await page.mouse.move(bounds.x + 4, bounds.y + 4)
  await page.mouse.down()
  await page.mouse.move(2, 2, {steps: 5})
  await page.mouse.up()
  await expect(dialog).toBeVisible()
  await page.mouse.click(2, 2)
  await expect(dialog).toBeHidden()
})

test('overlapping dialogs keep scroll locked until the last unmount or close', async ({
  page,
}) => {
  await page.evaluate(() => {
    document.body.style.setProperty('overflow-x', 'scroll', 'important')
    document.body.style.setProperty('overflow-y', 'auto')
  })
  await page.getByRole('button', {name: 'Open modal', exact: true}).click()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.getByRole('button', {name: 'Open second modal'}).click()
  await page.getByRole('button', {name: 'Unmount underlying modal'}).click()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Escape')
  await expect(page.locator('body')).toHaveCSS('overflow-x', 'scroll')
  await expect(page.locator('body')).toHaveCSS('overflow-y', 'auto')
  expect(
    await page.evaluate(() =>
      document.body.style.getPropertyPriority('overflow-x'),
    ),
  ).toBe('important')
  await page.getByRole('button', {name: 'Open modal', exact: true}).click()
  await page.getByRole('button', {name: 'Unmount modal', exact: true}).click()
  await expect(page.locator('body')).toHaveCSS('overflow-x', 'scroll')
  await expect(page.locator('body')).toHaveCSS('overflow-y', 'auto')
})

test('accordion markup remains exclusive without JavaScript', async ({
  browser,
  page,
}) => {
  const markup = await page
    .getByLabel('First group')
    .evaluate((element) => element.outerHTML)
  const context = await browser.newContext({javaScriptEnabled: false})
  const staticPage = await context.newPage()
  await staticPage.setContent(markup)
  await expect(
    staticPage.getByText('First answer', {exact: true}),
  ).toBeVisible()
  await staticPage.getByText('Second question', {exact: true}).click()
  await expect(
    staticPage.getByText('Second answer', {exact: true}),
  ).toBeVisible()
  await expect(staticPage.getByText('First answer', {exact: true})).toBeHidden()
  await context.close()
})
