class ParallaxObject {
  constructor(props) {
    this.listRoot = props.listRoot;
    this.info = props.data;

    this.listItem = document.createElement("div");
    this.content = document.createElement("div");
    this.titleContainer = document.createElement("span");
    this.title = document.createElement("h2");
    this.img = document.createElement("img");
    this.divider = document.createElement("div");

    this.listItem.className = "list-item";
    this.titleContainer.className= "title";
    this.content.className = "content";

    this.title.innerHTML = this.info.title;
    this.img.src = this.getImage();
    this.getImage = this.getImage.bind(this);

    this.constructElement();
    this.container = this.listRoot.getBoundingClientRect();
    this.rect = this.listItem.getBoundingClientRect();
  }

  getImage() {
    const pics = this.info.thumbnails;
    if (pics.length === 0) {
      return './placeholder.png';
    } else if (pics.length === 1) {
      return pics[0].url;
    } else {
      const index = this.getAppropriateSize(pics);
      return pics[index].url;
    }
  }

  getAppropriateSize(pics) {
    // will need to change depending on screen size &
    // return the correct index
    const containerWidth = this.listRoot.getBoundingClientRect().width;
    // const containerWidth = this.container.width;
    let i = -1;
    // get the next largest resolution image for that device's width
    // the extra height will be needed to create a parallax effect
    while (i < pics.length - 1 && pics[i + 1].width <= containerWidth) {
      i++;
    }
    return i + 1 ;
  }

  constructElement() {
    this.listItem.appendChild(this.content);
    this.content.appendChild(this.titleContainer);
    this.titleContainer.appendChild(this.title);
    this.content.appendChild(this.img);
    this.content.appendChild(this.divider);
  }

  isVisible(top, bottom) {
    return (
      (top < this.container.bottom && bottom > this.container.top)
    );
  }

  animate(rect) {
    const top = rect.top;
    const bottom = rect.bottom;
    const height = rect.height;
    if (this.isVisible(top, bottom)) {
      const topOffset = (-25 * ((top + 20) / this.container.height ) - 20);
      this.img.style.bottom = `${topOffset}px`;
    }
  }

}

export default ParallaxObject;
