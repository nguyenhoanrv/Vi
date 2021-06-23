# lab 5 , assignment 5
.data
string: .space 25
.text
	la $s0, string 
	li $s1, 0
	li $s2, 0 
	li $s4 , 20    			# max length
	li $s5, 10     			# ASCII code of '\n'
start_read_each_char:
	li $v0, 12    			# service 12 is read character
	syscall
	add $s1, $s0, $s2    		#load string[i]
	addi $s2, $s2, 1         	# i += 1
	beq $s2, $s4 , end_read   	# stop when length = max_length
	beq $v0, $s5, end_read        	# stop when ENTER
	sb $v0, 0($s1)            	# s1[0] = $v0 store byte
	j start_read_each_char
end_read:
# print reverse string 
print_reverse_string:
	li $v0, 11     			# service 11 is print character
	lb $a0, 0($s1)			# load byte
	syscall				# print character
	beq $s1,$s0, exit  		# if s1==s0 exit
	addi $s1, $s1, -1		# i--
	j print_reverse_string
exit: