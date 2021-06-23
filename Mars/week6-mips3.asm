.data
A: 	.word 	7, -2, 5, 1, 5, 6, 7, 3, 6, 8, 8, 59, 5
.text
main: 
    		la 	$a0,A    		#$a0 = Address(A[0])
    		li 	$s0, 13  		# initialize length of arrayA (n = 13) 
    		j 	sort      		#sort
after_sort: 
    		li 	$v0, 10 		#exit
    		syscall
end_main:
sort:
    		li 	$t0, 0   		# initialize index i in $t0 to 0
loop1:
     		slt  $v0, $t0, $s0     # if i < n: $v0 = 1
    		beq  $v0, $zero, end_loop1  # if i >= n branch to end_loop1
    		li 	$t1, 0   	# $t1 = j = 0
loop2:
		addi	$t2, $s0, -1
		sub	$t2, $t2, $t0		# $t2 = tmp = n-i-1  
		slt 	$v0, $t1, $t2    	 	# if j < tmp: $v0 = 1
    		beq	$v0, $zero, end_loop2
if:
    		sll 	$t5, $t1, 2			# put 4j in $t5
    		add 	$t5, $t5, $a0		# put address A[j] to $t5
    		lw 	$t3, 0($t5)    		# load $t3 = A[j]
    		lw	$t4, 4($t5)			# $t4 = A[j+1]
    		sgt 	$v0, $t3, $t4   		# if A[j] > A[j+1] : $v0 = 1
    		beq 	$v0, $zero, end_if   	# if A[j] <= A[j+1] branch end_if
    		j 	swap
end_if:
		addi 	$t1, $t1, 1	# j++
    		j 	loop2
end_loop2:
    		addi	$t0, $t0, 1	# i++
    		j 	loop1
end_loop1:
		j	after_sort
swap:
		sw	$t4, 0($t5)
		sw	$t3, 4($t5)
		j	end_if   
