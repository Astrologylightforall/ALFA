import { JSX } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      cosmicShaderMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.Ref<THREE.Mesh>;
        time?: number;
        resolution?: THREE.Vector2;
        mouse?: THREE.Vector2;
        scrollProgress?: number;
      };
    }
  }
}
