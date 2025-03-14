import { Document } from './Document'

export class SVGFontLoader {
  loaded = false

  constructor(
    private readonly document: Document
  ) {
    document.fonts.push(this)
  }

  async load(fontFamily: string, url: string) {
    try {
      const { document } = this
      const svgDocument = await document.canvg.parser.load(url)
      const fonts = svgDocument.getElementsByTagName('font')

      Array.from(fonts).forEach((fontNode: HTMLElement) => {
        const font = document.createElement(fontNode)

        document.definitions.set(fontFamily, font)
      })
    } catch (err) {
      console.error(`Error while loading font "${url}":`, err)
    }

    this.loaded = true
  }
}
