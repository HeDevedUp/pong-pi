import { Position, Size, ArrowKeys, WsKeys } from "features/ping-pong/types";

export class Player {
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public position: Position,
    public size: Size,
    private keyType: "WS" | "ARROWS" | "MOUSE",
    private wsKeys: WsKeys,
    private arrowKeys: ArrowKeys,
    private velocityY: number
  ) {
    if (this.keyType === "MOUSE") {
      // Listen for mousemove events to track mouse position
      window.addEventListener("mousemove", this.onMouseMove);
    }
  }

  draw = (color: string) => {
    const { x, y } = this.position;
    const { w, h } = this.size;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);

    if (this.keyType === "WS") {
      // Keyboard controls for WS
      if (this.wsKeys.KeyW && y > 10) {
        this.position.y -= this.velocityY;
      }

      if (this.wsKeys.KeyS && y < this.ctx.canvas.height - this.size.h - 10) {
        this.position.y += this.velocityY;
      }
    }

    if (this.keyType === "ARROWS") {
      // Keyboard controls for ARROWS
      if (this.arrowKeys.ArrowUp && y > 10) {
        this.position.y -= this.velocityY;
      }

      if (
        this.arrowKeys.ArrowDown &&
        y < this.ctx.canvas.height - this.size.h - 10
      ) {
        this.position.y += this.velocityY;
      }
    }

    if (this.keyType === "MOUSE") {
      // Mouse controls
      // Move the player's paddle towards the mouse's y position
      const targetY = this.mouseY - this.size.h / 2;
      if (y < targetY) {
        this.position.y += this.velocityY;
      } else if (y > targetY) {
        this.position.y -= this.velocityY;
      }
    }
  };

  // Handle mousemove event to track mouse position
  private onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };
}
