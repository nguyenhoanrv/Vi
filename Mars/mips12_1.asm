.data 
Message: .asciiz "Ket qua tinh giai thua : "
.text
main:	jal	WARP
print: 
	add	$a1,$v0,$zero # $a0 luu ket qua cua N!
	li	$v0,56
	la	$a0,Message
	syscall
quit:
	li	$v0,10
	syscall
endmain:
#====================================================
WARP:	
	sw	$fp,-4($sp)	# luu frame pointer hien tai (1)
	addi	$fp,$sp,0	# frame pointer moi chi toi dinh cua stack (2)
	addi	$sp,$sp,-8	# tao 2 ngan nho moi trong stack
	sw	$ra,0($sp)	# luu dia chi tro ve ham main (4)
	li	$a0,10		# N=3 => tinh 3!
	jal	FACT
	nop
	lw	$ra,0($sp)	# khoi phuc gia tri tra ve ham main(5)
	addi	$sp,$fp,0	# xoa ngan nho stack sau khi su dung xong
	lw	$fp,-4($sp)	# khoi phuc frame pointer
	jr	$ra		# quay ve main
	nop
#=======================================================
FACT:	
	sw	$fp,-4($sp)	# luu frame pointer hien tai
	addi	$fp,$sp,0	# frame pointer moi chi toi dinh cua stack
	addi	$sp,$sp,-12	# tao 3 ngan nho trong stack de luu gia tri $fp,$ra,$a0
	sw	$ra,4($sp)	# luu dia chi tro ve
	sw	$a0,0($sp)	# luu gia tri $a0 hien tai
	
	slti	$t0,$a0,2
	beq	$t0,$0,recursive	# neu N > 2 goi ham recursive
	nop
	li	$v0,1			# else N! = 1
	j	done			# goi ham done
	nop
recursive:
	addi	$a0,$a0,-1	# N = N -1
	jal	FACT
	nop
	lw	$v1,0($sp)	# lay ra gia tri a0
	mult	$v1,$v0		# tinh N! * (N + 1)
	mflo	$v0		# luu gia tri tim dc ra $vo
done:
	lw	$ra,4($sp)	# khoi phuc dia chi tro ve
	lw	$a0,0($sp)	# khoi phuc gia tri a0 truoc do
	addi	$sp,$fp,0	# khoi phuc stack pointer
	lw	$fp,-4($sp)	# khoi phuc frame pointer
	jr	$ra
	nop
	