#MaiHoangMinh-20184151
#Write a program to get decimal numbers, 
#display those numbers in binary and hexadecimal.
#--------------------------------------

.data 
#Khai bao du lieu
string: .space   10	#Xau dau vao 
Message:    .asciiz "\nNhap vao so thap phan (Toi da 8 chu so):" 
Message2: .asciiz "\nXau dau vao chi gom toi da 8 chu so, Nhap lai:"

ans: .asciiz "\nket qua hex: "
hex_result: .space 8
bin_result: .space 32

.text 
main:
	jal input_value		#Lay gia tri nhap vao
	nop
	
	jal hex_convert		#Chay ham chuyen sang hex_number
	nop
	
	la $a0,hex_result	#In ra gia tri hex
	li $v0,4
	syscall
	
	
	li $v0, 10 	#Ket thuc chuong trinh
	syscall


end_main:


#------------------------------------
#Procedure input_value:

#Nhap xau dau vao string
#Kiem tra xau vao co phai la so thap phan khong
#Neu dung so se duoc luu tru trong $s2
#return $s2
#------------------------------------
input_value:
	li $v0,4	#In ra string Message 
	la $a0,Message 
	syscall 

#$s0 la dia chi string
#$s1 la so luong phan tu
	la $s0,string	#Lay dia chi xau dau vao 
	j read_char #Bo qua vong while dau tien (Check loi)
while_input:
	li $v0,4	#In ra string Message2 bao loi nhap
	la $a0,Message2
	syscall 

	add $t0, $zero, $zero #Khoi tao bien dem i
#Doc lan luot tung ki tu, kiem tra loi
read_char: 

	li $v0,12	#Goi ham doc character 
	syscall

	beq $v0,10,end_read_char	#Nhan phim enter, nhan xau 
	nop
	blt $v0, 48, while_input	#Kiem tra dau vao khong la so?, check gia tri <0
	bgt $v0, 57, while_input 	#Kiem tra dau vao khong la so?, check gia tri >9
	
	add $t1,$s0,$t0		#Lay ki tu string[i] 
	sb $v0, 0($t1)	#Nap character vao string 

	addi $t0,$t0,1	#i = i + 1 
	beq $t0, 8, end_read_char	#Gioi han ki tu la 8, thoat chuong trinh 
	nop
	j read_char	#Quay lai vong lap
	nop
end_read_char: 

#Khoi tao gia tri sau khi thuc hien doc chuoi nhap vao string
	add $s1,$s1,$t0 #Lay so luong phan tu string gan vao $s1
	add $t0,$zero,$zero #reset $t0
	add $t1,$zero,$zero #reset $t1

#Chuyen string thanh gia tri integer
#Gia tri so nhap vao luu trong $s2
add $s2, $zero, $zero #Khoi tao $s2

while:
	beq $t0,$s1,exit_while #$t0 luu gia tri bien dem i; Dieu kien thoat vong lap i = n
	add $t1,$s0,$t0 #Lay dia chi string[i]
	lb $t2,0($t1) #Lay string [i]
	
	sub $t3,$s1,$t0 #Lay vi tri cua chu so trong string(n - i)
	add $t5,$zero,1 #Khai bao chi so (10 ^ (n - i))
	add $t4,$zero,$zero #khoi tao bien dem j
#Vong lap for tinh gia tri tung chu so
for:
	add $t4,$t4,1 #Khai bao bien dem j = j + 1
	beq $t4,$t3,end_for #ket thuc vong for (j == n - i)
	nop
	mul $t5,$t5,10 #moi vong lap, nhan them 10
	j for
	nop
end_for:
	sub $t2, $t2, 48 #Lay so thap phan tu ki tu character
	mul $t2, $t2, $t5 #Lay gia tri tai mot chu so
	add $s2, $s2, $t2 #Nap vao so integer can nhap
	addi $t0, $t0, 1 #i = i + 1
j while
nop

exit_while:

input_value_end:
	jr $ra
	nop

#-----------------------
#Procedure hex_convert:
#arg[1] $s2
#return hex_result
#------------------------
hex_convert:
	add $t2,$s2,$zero	#Lay gia tri so input gan vao $t2
	
	la $a0,ans	#in ra string ans
	li $v0,4
	syscall

	li $t5,0	#flag $t5 = 0 
	li $t0,8	#Gan gia tri i = 8 (So vong lap)       
	la $t3,hex_result	#Lay dia chi string result

Loop_hex:
	beqz $t0,hex_convert_end	#Dieu kien thoat vong lap i = 0	
	nop
	rol $t2,$t2,4	#Xoay vong, lan luot lay ra 4 bit (Tuong ung voi 1 vi tri trong he co so 16)
	and $t4,$t2,0xf		#$t4 chi luu gia tri 4 bit lay ra
	beq $t4,0,End_hex1
	nop
	li  $t5,1
	ble $t4,9,Sum_hex	#Neu $t4 <= 9 gia tri se cong them 48 (gia tri tu 0 - > 9 trong ascii)
	nop
	addi $t4,$t4,87	       #Neu $t4 >9 gia tri cong them 55 (gia tri A, B, C, D, E, F)
	b End_hex	#Chuyen huong xuong end_hex
	nop

End_hex1:
	beq $t5,0,End_hex2
Sum_hex:
	addi $t4, $t4, 48 #Neu $t4 <= 9 gia tri se cong them 48 (gia tri tu 0 - > 9 trong ascii)
End_hex:
	sb $t4, 0($t3)	#Nap vao hex_result		
	addi $t3, $t3, 1	#Lay hex_result[j]	
End_hex2:
	addi $t0, $t0, -1	#i = i - 1
	j Loop_hex	#Quay lai vong lap
	nop
hex_convert_end:
	jr $ra	#Quay ve chuong trinh chinh
	nop
	

