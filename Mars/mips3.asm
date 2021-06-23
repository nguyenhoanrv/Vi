#Laboratory Exercise 5, Home Assignment 4
.data
	string: .space 50
	Message1: .asciiz "Nhap xau:"		# Store Message1 in the data segment and add null terminator
	Message2: .asciiz "Do dai la "		# Store Message2 in the data segment and add null terminator
.text
main:
get_string:
	li	$v0, 54				# service 54 is InputDialogString 
	la	$a0, Message1
	la	$a1, string
	li	$a2, 50				# service 50 is ConfirmDialog 
	syscall
get_length: 
	la 	$a0, string 			# a0 = Address(string[0])
 	xor 	$v0, $zero, $zero 		# v0 = length = 0
 	xor 	$t0, $zero, $zero 		# t0 = i = 0
check_char: 
	add 	$t1, $a0, $t0 			# t1 = a0 + t0
 						#= Address(string[0]+i)
 	lb 	$t2, 0($t1) 			# t2 = string[i]
 	beq 	$t2,$zero,end_of_str 		# Is null char?
 	addi 	$v0, $v0, 1 			# v0=v0+1->length=length+1
 	addi 	$t0, $t0, 1 			# t0=t0+1->i = i + 1
 	j 	check_char
end_of_str:
end_of_get_length:
	addi	$v0, $v0, -1
print_length:
	add	$a1,$zero, $v0
	li	$v0, 56				# service 56 is MessageDialogInt
	la	$a0,	Message2
	syscall 
	