import { Button, Input, Popover, PopoverController, Tooltip as GrafanaTooltip } from '@grafana/ui';
import { ButtonProps, Elements, PopoverProps, TooltipProps } from '@jaegertracing/jaeger-ui-components';
import React, { useRef } from 'react';

/**
 * Right now Jaeger components need some UI elements to be injected. This is to get rid of AntD UI library that was
 * used by default.
 */

// This needs to be static to prevent remounting on every render.
export const UIElements: Elements = {
  Popover({ children, content, overlayClassName }: PopoverProps) {
    const popoverRef = useRef<HTMLElement>(null);

    return (
      <PopoverController content={content} hideAfter={300}>
        {(showPopper, hidePopper, popperProps) => {
          return (
            <>
              {popoverRef.current && (
                <Popover
                  {...popperProps}
                  referenceElement={popoverRef.current}
                  wrapperClassName={overlayClassName}
                  onMouseLeave={hidePopper}
                  onMouseEnter={showPopper}
                />
              )}

              {React.cloneElement(children, {
                ref: popoverRef,
                onMouseEnter: showPopper,
                onMouseLeave: hidePopper,
              })}
            </>
          );
        }}
      </PopoverController>
    );
  },
  Tooltip({ children, title }: TooltipProps) {
    return <GrafanaTooltip content={title}>{children}</GrafanaTooltip>;
  },
  Icon: (() => null as any) as any,
  Dropdown: (() => null as any) as any,
  Menu: (() => null as any) as any,
  MenuItem: (() => null as any) as any,
  Button({ onClick, children, className }: ButtonProps) {
    return (
      <Button variant="secondary" onClick={onClick} className={className}>
        {children}
      </Button>
    );
  },
  Input(props) {
    return <Input {...props} />;
  },
  InputGroup({ children, className, style }) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  },
};
