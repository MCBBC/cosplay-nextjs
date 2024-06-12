import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
// 定义 ref 暴露的方法类型
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

      // // 使用 useImperativeHandle 自定义 ref 暴露的实例值
      // Clear the effect
      return () => {
        vd?.destroy();
        setVd(undefined);
      };
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          // ... 你的方法 ...
          getContent: () => {
            return vd?.getValue();
          },
        };
      },
      [vd]
    );

    return <div id="vditor" className="mt-4" ref={ref} />;
  }
);

export {CosplayContent};
