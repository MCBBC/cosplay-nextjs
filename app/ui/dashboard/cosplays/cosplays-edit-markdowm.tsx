import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

export interface VditorInstance {
  getContent: () => string;
}

const CosplayContent = forwardRef(
  (
    {
      markdownText,
    }: {
      markdownText: string;
    },
    ref: any
  ) => {
    const [vd, setVd] = useState<Vditor>();

    useEffect(() => {
      const vditor = new Vditor("vditor", {
        after: () => {
          vditor.setValue(markdownText);
          setVd(vditor);
        },
        height: 500,
      });

      return () => {
        vd?.destroy();
        setVd(undefined);
      };
    }, [markdownText, vd]); // 将 markdownText 添加为依赖

    useImperativeHandle(
      ref,
      () => ({
        getContent: () => {
          return vd?.getValue();
        },
      }),
      [vd]
    );

    return <div id="vditor" className="mt-4" />;
  }
);

CosplayContent.displayName = "CosplayContent"; // 给组件分配一个displayName

export { CosplayContent };
