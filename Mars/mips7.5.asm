.data
max:	.asciiz "Gia tri lon nhat la : "
min: 	.asciiz "Gia tri nho nhat la : "
storedMax:	.asciiz "Gia tri nho nhat duoc luu trong $s"
storedMin:	.asciiz "Gia tri lon nhat duoc luu trong $s"
.text
main: 	li $s0, 2
	li $s1, 9
	li $s2, 4
	li $s3, 12
	li $s4, -1
	li $s5, 8
	li $s6, 94
	li $s7, -8
	jal stack 			
	nop
	li $v0, 56		
	la $a0, storedMax	# in ra noi luu tru max
	add $a1,$t8,$zero
	syscall
	la $a0, max		# in ra max
	add $a1,$t0,$zero
	syscall	
	la $a0, storedMin	# in ra noi luu tru min
	add $a1,$t9,$zero
	syscall
	la $a0, min		# in ra min
	add $a1,$t1,$zero
	syscall
	li $v0, 10			# exit 
	syscall
endmain:
swapMax:add $t0,$t2,$zero	#  max = $t2
	add $t8,$t3,$zero	# stored of max = $t3
	jr $ra
swapMin:add $t1,$t2,$zero	#  min = $t2
	add $t9,$t3,$zero	# stored of min = $t3
	jr $ra
stack:	add $fp,$sp,$zero	
	addi $sp,$sp, -32	# tao stack
	sw $s1, 0($sp)
	sw $s2, 4($sp)
	sw $s3, 8($sp)
	sw $s4, 12($sp)
	sw $s5, 16($sp)
	sw $s6, 20($sp)
	sw $s7, 24($sp)
	sw $ra, 28($sp)		# luu $ra cua main
	add $t0,$s0,$zero	# ban dau khoi tao max = $s0
	add $t1,$s0,$zero	#  min = $s0
	li $t8, 0			#  stored of max = 0
	li $t9, 0			
	li $t3, 0			
max_min:addi $sp,$sp,4        
	lw $t2,-4($sp)
	sub $t4, $sp, $fp	 
	beq $t4,$zero, done	
	addi $t3,$t3,1	
	sub $t4,$t0,$t2		
	bltzal $t4, swapMax	# neu max < $t2, swapMax
	sub $t4,$t2,$t1		
	bltzal $t4, swapMin	# neu $t2 < min, swapMin
	j max_min			
done: 
        lw $ra, -4($sp)	
	jr $ra 			
