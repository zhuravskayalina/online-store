export class SmallImage {
  image: HTMLImageElement;

  constructor(url: string) {
    this.image = this.createImage(url);
  }

  createImage(url: string) {
    const image = document.createElement('img');
    image.classList.add('card__gallery-img');
    image.setAttribute('alt', 'Product look');
    image.setAttribute('src', url);

    image.addEventListener('click', function () {
      const bigImage = document.querySelector(
        '.card__main-img'
      ) as HTMLImageElement;
      bigImage.src = image.src;
    });

    return image;
  }
}
