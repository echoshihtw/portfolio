class MatrixSymbol {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} fontSize
   * @param {number} canvasHeight
   */
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
    this.hue = Math.floor(Math.random() * 360);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillStyle = "hsl(" + this.hue + ", 100%, 50%)";
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
      this.y = 0;
      return;
    }

    this.y += 1;
  }
}

class MatrixEffect {
  /**
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    /** @type {MatrixSymbol[]} */
    this.symbols = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.columns; i += 1) {
      this.symbols[i] = new MatrixSymbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
}

function startMatrixAnimation() {
  const canvasElement = document.getElementById("canvas1");
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvasElement.getContext("2d");
  if (!context) {
    return;
  }

  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  const effect = new MatrixEffect(canvasElement.width, canvasElement.height);

  const animate = () => {
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    context.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(context));
    requestAnimationFrame(animate);
  };

  animate();
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  startMatrixAnimation();
}
