import { setFallState } from "./setFallState";
import { setHurtState } from "./setHurtState";

export function setState() {
  setFallState.call(this);
  setHurtState.call(this);
}
