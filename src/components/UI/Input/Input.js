import React, { useRef, useImperativeHandle } from 'react'

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef()

	const activate = () => {
		inputRef.current.focus()
	}

	useImperativeHandle(ref, () => {
		return {
			focus: activate,
		}
	})

	return (
		<div className={`${classes.control} ${props.inputState.isValid === false ? classes.invalid : ''}`}>
			<label htmlFor={props.email}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.email}
				id={props.email}
				value={props.inputState}
				onChange={props.changeHandler}
				onBlur={props.validateHandler}
			/>
		</div>
	)
})

export default Input
