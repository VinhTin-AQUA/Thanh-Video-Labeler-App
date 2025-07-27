// src/app/shared/signals/dialog.signal.ts
import { signal } from '@angular/core';


export interface DialogData {
  title: string;
  message: string;
  isSuccess: boolean;
  visible: boolean;
//   timeoutId?: number;
}

export const dialogSignal = signal<DialogData>({
  title: '',
  message: '',
  isSuccess: true,
  visible: false
});

export function showGlobalDialog(
  title: string,
  message: string,
  isSuccess: boolean
) {
  // Clear any previous timeout
//   const prevTimeout = dialogSignal().timeoutId;
//   if (prevTimeout) clearTimeout(prevTimeout);

  const timeoutId = window.setTimeout(() => hideGlobalDialog(), 10000);

  dialogSignal.set({
    title,
    message,
    isSuccess: isSuccess,
    visible: true,
    // timeoutId
  });
}

export function hideGlobalDialog() {
//   const prevTimeout = dialogSignal().timeoutId;
//   if (prevTimeout) clearTimeout(prevTimeout);    

  dialogSignal.set({
    ...dialogSignal(),
    visible: false,
    // timeoutId: undefined
  });
}
