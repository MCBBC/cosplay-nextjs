import { Button } from "@nextui-org/react";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h3>Please disable your ad blocker!</h3>
      <p>
        We know ads are annoying but please bear with us here & disable your ad
        blocker!
      </p>
      <Link href={"/front"}>
        <Button> refresh</Button>
      </Link>
    </div>
  );
}
