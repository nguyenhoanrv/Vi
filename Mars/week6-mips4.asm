.data 
A:        .word   5, 2, 9, -3, 10, 4, 6, 8, -2, -5
 
.text
main:               la         $a0, A	# $a0 = Address(A[0])
                    li         $t0, 1   	# initialize index i in $t0 to 1
                    li         $t1, 10 	# initialize length(n) in $t1 to 10
                    j          sort
                        
after_sort:         li          $v0, 10  # exit
                    syscall
end_main:
sort:                 
                    beq      $t0, $t1, done 		# i = n ->done
                    add      $t2, $t0, -1     		# j = i -1
                    add      $s2, $t0, $t0     	# i = i*2
                    add      $s2, $s2, $s2     	# i = i*4
                    add      $a1, $s2, $a0    		# a1 = 4i + A
                    lw       $s3, 0($a1)       	# s3 = A[i]
                    j        while               
while:              
  add      	$s2, $t2, $t2      
                    add      $s2, $s2, $s2    	 
                    add      $v0, $s2, $a0    		# v0 = 4j + A
                    lw       $s4, 0($v0)       	# s4 = A[j]
                    sgt      $s1, $s4, $s3   		# s4 > s3 -> s1 = 1
                    beqz     $s1, after_while      	# if s1 = 0 branch to after_while
                    bltz     $t2, after_while 		# if j < 0 branch to after_while
                    add      $t3, $t2, 1       	# t3 = j + 1
                    add      $s2, $t3, $t3      
                    add      $s2, $s2, $s2     
                    add      $v1, $s2, $a0    		# v1 = 4(j+1) + A
                    sw       $s4, 0($v1)     		# A[j+1] = s4 = A[j]
                    addi     $t2, $t2, -1      	# j--      
                    j        while
after_while:    
                    add      $t3, $t2, 1       	# t3 = j + 1
                    add      $s2, $t3, $t3      
                    add      $s2, $s2, $s2     
                    add      $a2, $s2, $a0    		# a2 = 4(j+1) + A
                    sw       $s3, 0($a2)      		# A[j+1] = s3 = A[i]
                    add      $t0, $t0, 1       	# i++
                    j        sort 
done:               j        after_sort
