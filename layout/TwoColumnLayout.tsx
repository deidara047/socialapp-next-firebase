import { ReactElement } from "react";

export interface ColumnsLayout {
  default: ReactElement;
  right?: ReactElement
}

// Instead of children, this uses props, due to lack of 'Named Children'
export default function TwoColumnLayout(props: ColumnsLayout) {
  return (<>
    <div className="row">
      <div className="col-7">
        {props.default}
      </div>
      <div className="col-4 offset-sm-1">
        {props.right}
      </div>
    </div>
    </>
  )
}

/*
<div className="row">
        <div className="col-7">
          {children}
        </div>
        <div className="col-4 offset-sm-1">
          <div className="card">
            Testing
          </div>
        </div>
      </div>
*/