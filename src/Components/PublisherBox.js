// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import "./PublisherBox.css"



export default function PublisherBox(props: Object){
  const publisher = props.publisher;
  return (
    <div className="white-box publisher-box">
      <div className="inner">
        <h3><Link to={`publishers/${publisher.id}`}>{publisher.title}</Link></h3>
        <div className="">{publisher.description}</div>
      </div>
  </div>
  )
}
