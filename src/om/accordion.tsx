import React from "react";
import { Disclosure } from "@headlessui/react";
import { tw } from "twind";
import { DivProps } from "./types";

const AccordionHeader: React.FC<{ open: boolean }> = ({ children, open }) => (
  <Disclosure.Button
    className={tw`p-2 bg-gray-100 w-full text-left flex select-none`}
  >
    <div>
      {open ? "-" : "+"} {children}
    </div>
  </Disclosure.Button>
);
const AccordionPanel: React.FC = ({ children, ...props }: DivProps) => (
  <Disclosure.Panel>
    <div {...props} className={tw(props.className, `pt-2 pb-4`)}>
      {children}
    </div>
  </Disclosure.Panel>
);
export const Accordion: React.FC<{ title: string }> = ({ title, children }) => (
  <Disclosure defaultOpen>
    {({ open }) => (
      <>
        <AccordionHeader open={open}>{title}</AccordionHeader>
        <AccordionPanel>{children}</AccordionPanel>
      </>
    )}
  </Disclosure>
);
