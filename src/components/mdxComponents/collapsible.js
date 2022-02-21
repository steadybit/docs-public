/*
 * Copyright 2022 steadybit GmbH. All rights reserved.
 */
import React from 'react';
import { default as ReactCollapsible } from 'react-collapsible';
import './collapsible.css';

export default function Collapsible({ title, children }) {
  return (<ReactCollapsible
    transitionTime={200}
    triggerWhenOpen={
      <div className={'collapsible__trigger collapsible__trigger--open heading h5'}>
          {title}
      </div>
    }
    trigger={
      <div className={'collapsible__trigger collapsible__trigger--closed heading h5'}>
          {title}
      </div>
    }
  >
    <div className={'collapsible__content'}>
      {children}
    </div>
  </ReactCollapsible>);
}
