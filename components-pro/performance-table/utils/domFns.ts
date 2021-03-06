import { ColumnProps } from '../Column.d';

// @ts-ignore
export function addEvent(el?: any, event: string, handler: EventListener | EventListenerObject | null, inputOptions?: Object): void {
  if (!el) return;
  const options = { capture: true, ...inputOptions };
  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

export function removeEvent(el: any, event: string, handler: Function, inputOptions?: Object): void {
  if (!el) return;
  const options = { capture: true, ...inputOptions };
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

export function findHiddenKeys(children, columns: ColumnProps[]): string[] {
  const hiddenColumnKeys: string[] = [];
  if (columns && columns.length) {
    Array.from(columns as Iterable<any>).map(
      (child: any) => {
        if (child && child.hidden) {
          hiddenColumnKeys.push(child.dataIndex);
        }
      },
    );
  } else if (children && children.length) {
    Array.from(children as Iterable<any>).map(
      (child: any) => {
        if (child.props && child.props.hidden) {
          const columnChildren: any = child.props.children;
          hiddenColumnKeys.push(columnChildren[1].props.dataKey);
        }
      },
    );
  }
  return hiddenColumnKeys;
}
