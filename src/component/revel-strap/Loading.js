import React from "react";
const Loading = (props) => {
  if (props.showLoading) {
    return (
      <div className="modal fade" tabIndex="-1" style={{ display: 'block', opacity: 1, }} >
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', position: 'fixed', top: 'calc(50vh - 100px)', left: 'calc(50vw - 100px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="_loading">
            <circle cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
            <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
              <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
            </circle>
          </svg>
          <br />
          <h5 style={{ textAlign: "center" }}>{props.displayText ? props.displayText : "ระบบกำลังดำเนินการ"}</h5>
        </div>
      </div>
    )
  } else {
    return (
      null
    )
  }

}

export default Loading;
