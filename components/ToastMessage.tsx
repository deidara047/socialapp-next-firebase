export type ToastKinds = "success" | "danger";

export interface ToastKindsInterface {
  message: string,
  kind: ToastKinds
}

export default function ToastMessage({message, kind }: { message: string, kind: ToastKinds}) {
  return <div className={`toast align-items-center text-bg-${kind} border-0`} style={{display: "block"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="d-flex">
    <div className="toast-body">
      {message}
    </div>
    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
}