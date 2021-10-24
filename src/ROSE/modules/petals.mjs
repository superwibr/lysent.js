const petals = {
	// GLOBAL petals
	_: Symbol(),

	// THREAD petals
	THREAD: Symbol('thread'),
	LIN: Symbol('Linear thread'),
	SEQ: Symbol('Sequential thread'),
	IND: Symbol('Independant thread')
}

export default petals