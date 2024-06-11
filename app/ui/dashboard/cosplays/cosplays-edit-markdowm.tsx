import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default function CosplayContent({
  markdownText,
}: {
  markdownText: string;
}) {
  const [vd, setVd] = useState<Vditor>();
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue(markdownText);
        setVd(vditor);
      },
      height: 500,
    });
    // Clear the effect
    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, []);
  return <div id="vditor" className="mt-4" />;
}
