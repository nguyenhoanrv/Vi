.eqv MONITOR_SCREEN 	0x10010000
.eqv RED            	0x00FF0000
.eqv GREEN          	0x0000FF00
.eqv BLUE           	0x000000FF
.eqv WHITE          	0x00FFFFFF
.eqv YELLOW         	0x00FFFF00
.text
li 	$k0, MONITOR_SCREEN
li 	$s1, 0
li 	$s3, 4
loop1: 
	li 	$t0, WHITE
	sw  	$t0, 0($k0)
	addi 	$k0, $k0, 8		# assign address of the next block
	addi 	$s1, $s1, 1		# i = i + 1
	beq  	$s1, $s3, reset1	# if i == 4 then branch to reset1  
	j 	loop1
reset1: 	
	li 	$s1, 0			# reset i = 0
	j 	loop2
loop2:	
li 	$t0, WHITE
	sw  	$t0, 4($k0)
	addi 	$k0, $k0, 8		# assign address of the next block
	addi 	$s1, $s1, 1		#  i = i + 1
	beq  	$s1, $s3, reset2	# if i == 4 then branch to reset 2
	j 	loop2
reset2: 
	li 	$s1,0 			# reset i = 0
	j 	loop1
end:
