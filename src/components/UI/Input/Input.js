import React from 'react'

import classes from './Input.module.css'

const Input = props => {
	return (
		<div className={`${classes.control} ${props.inputState.isValid === false ? classes.invalid : ''}`}>
			<label htmlFor={props.email}>{props.label}</label>
			<input
				type={props.email}
				id={props.email}
				value={props.inputState}
				onChange={props.changeHandler}
				onBlur={props.validateHandler}
			/>
		</div>
	)
}

export default Input
