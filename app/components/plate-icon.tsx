import Image from "next/image";
import Plate from "./plate.png";

export default function PlateIcon({ className }: { className: string }) {
  return <Image src={Plate} className={className} alt="Plate Competition" />;
}
