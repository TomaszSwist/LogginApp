import React, { useState, useEffect, useReducer } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: action.value.includes('@') }
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') }
	}
	return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: action.value.trim().length > 6 }
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 }
	}
	return { value: '', isValid: false }
}

const Login = props => {
	const [formIsValid, setFormIsValid] = useState(false)

	const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log('Check for validity')
			setFormIsValid(emailState.isValid && passwordState.isValid)
		}, 500)
		return () => clearTimeout(timer)
	}, [emailState.isValid, passwordState.isValid])

	const emailChangeHandler = event => {
		dispatchEmail({ type: 'USER_INPUT', value: event.target.value })
	}

	const passwordChangeHandler = event => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value })
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' })
	}

	const submitHandler = event => {
		event.preventDefault()
		props.onLogin(emailState.value, passwordState.value)
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					type='email'
					label='E-mail'
					inputState={emailState.value}
					changeHandler={emailChangeHandler}
					validateHandle={validateEmailHandler}
				/>
				<Input
					type='password'
					label='Password'
					inputState={passwordState.value}
					changeHandler={passwordChangeHandler}
					validateHandle={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
