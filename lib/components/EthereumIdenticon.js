import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Jazzicon from 'jazzicon'


class EthereumIdenticon extends Component {
  constructor(props) {
    super(props)
    this.defaultDiameter = 46
  }

  componentDidMount() {
    const { address } = this.props

    if (!address) return

    const container = findDOMNode(this)

    const diameter = this.props.diameter || this.defaultDiameter
    const img = this.generateNewIdenticon(address, diameter)
    container.appendChild(img)
  }

  jsNumberForAddress(address) {
    const addr = address.slice(2, 10)
    return parseInt(addr, 16)
  }

  generateNewIdenticon(address, diameter) {
    const numericRepresentation = this.jsNumberForAddress(address)
    return Jazzicon(diameter, numericRepresentation)
  }

  componentDidUpdate() {
    const { address } = this.props

    if (!address) return

    const container = findDOMNode(this)

    const children = container.children
    for (let i = 0; i < children.length; i++) {
      container.removeChild(children[i])
    }

    const diameter = this.props.diameter || this.defaultDiameter
    const img = this.generateNewIdenticon(address, diameter)
    container.appendChild(img)
  }

  render() {
    const diameter = this.props.diameter || this.defaultDiameter
    const style = {
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'center',
      height: diameter,
      width: diameter,
      borderRadius: diameter / 2,
      overflow: 'hidden',
    }

    return <div key={`identicon-${this.props.address}`} style={style} />
  }
}

export default EthereumIdenticon
