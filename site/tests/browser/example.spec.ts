import {expect, test} from '@playwright/test'

for (const viewport of [
  {width: 390, height: 844, padding: '40px'},
  {width: 1440, height: 1000, padding: '80px'},
]) {
  for (const reducedMotion of ['reduce', 'no-preference'] as const) {
    test(`example at ${viewport.width}px with motion ${reducedMotion}`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize(viewport)
      await page.emulateMedia({reducedMotion})
      await page.goto('/example')
      await expect(page.getByRole('heading', {level: 2})).toBeVisible()
      await expect(page.locator('section')).toHaveCSS(
        'padding-top',
        viewport.padding,
      )
      await expect(page.locator('section > div')).toHaveCSS('opacity', '1')
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
      await testInfo.attach('example', {
        body: await page.screenshot({fullPage: true}),
        contentType: 'image/png',
      })
    })
  }
}
