# Project 17 : Write a program that inputs a string. Extract number characters and show to screen in inverse order using stack.

.data
	str: 		.asciiz "                                                      "       
	Message: 	.ascii 	"Input String: "                                                                          
	end1: 		.asciiz "\n"
.text
main: 
	jal getString			# Input
	nop
	jal Execution			# Algorithm		
	nop
	jal Output			# Output
	nop
#-----------------------------Input------------------------------#	
getString:
	li 	$v0, 54
	la 	$a0, Message
	la 	$a1, str			# We'll store it in 'input'
	li 	$a2, 50
	syscall
	jr 	$ra
	nop

#----------------------------Execution---------------------------#
Execution:
	la 	$t1,str 			# t1 points to the string
	addi 	$t2, $0, 0 		# extract number by t2
	
Push:
	lb 	$t0,($t1) 		# get a byte from string
	beq 	$t0,$zero,strEnd 	# zero means end of string

	addi 	$sp,$sp,-4 		# adjust stack pointer
	sw 	$t0,($sp) 		# PUSH the t0 register
	addi 	$t2,$t2,1		# extract number characters
	addi 	$t1,$t1,1 		# move pointer one character
	j 	Push 			# go round the loop again
	nop
strEnd:
	la 	$t1,str 			# points to the string
Pop:
	lb 	$t0,($t1) 		# get a byte from string
	beq 	$t0,$zero,DoneEx 	# zero means end of string
	lw 	$t0,($sp) 		# POP a value from the stack
	addi 	$sp,$sp,4 		# end adjust the pointer
	sb 	$t0,($t1) 		# store in string
	addi 	$t1, $t1,1 		# move pointer one character
	j 	Pop
	nop
DoneEx:
	jr 	$ra
	nop
	
#----------------------------Output--------------------------------#
Output:
	li 	$v0,1			# extract number character
	addi 	$a0,$t2,-1		
	syscall
	la 	$a0,str 			# system call to print
	li 	$v0,4 			# out a message
	syscall
	la 	$a0,end1 		# system call to print
	li 	$v0,4 			# out a newline
	syscall
	li 	$v0,10
	syscall 
	jr	$ra
	nop
