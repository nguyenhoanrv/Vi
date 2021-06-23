#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<ctype.h>
#define true 1
#define false 0
struct LinkedList{
    int data;
    struct LinkedList *next;
 };
struct W_LinkedList{
    char* data;
    struct W_LinkedList *next;
};

typedef struct LinkedList *node;
typedef struct W_LinkedList *wNode;

typedef int boolean;
typedef struct work{
    char* w;
    int number;
    node lines;
}dataType;

struct nodeType{
    dataType data;
    struct nodeType *left;
    struct nodeType *right;
};

typedef struct nodeType *TreeType;

boolean isEmpty(TreeType Root);
TreeType insertNode(TreeType Root, char* w, int l);
TreeType Search(TreeType Root, dataType value);
void deleteTree(TreeType Root);
void inorderPrint(TreeType Root);

node CreateNode(int value);
node AddTail(node head, int value);
node SearchLinkedList(node head, int value);
void Traverser(node head);
node InitHead();
void deleteLlist(node Root);

wNode CreateWNode(char* value);
wNode WAddTail(wNode head, char* value);
wNode WInitHead();
void WTranverser(wNode head);
int SearchWLinkedList(wNode head, char* value);
void deleteWLlist(wNode Root);

boolean isEmpty(TreeType Root){
    if(Root == NULL){
        return true;
    }
    return false;
}


TreeType insertNode(TreeType Root, char* w, int l){
    if(Root == NULL){
        node lines = NULL;
        lines = AddTail(lines,l);
        TreeType temp =(TreeType ) malloc(sizeof(struct nodeType));
        temp->data.w = malloc(sizeof(char) * 30);
        strcpy(temp->data.w, w);
        temp->data.number = 1;
        temp->data.lines = lines;
        temp->left = NULL;
        temp->right = NULL;
        Root = temp;
    }
    else if(strcmp(Root->data.w, w) > 0){
        Root->left = insertNode(Root->left, w,l);
    }
    else if(strcmp(Root->data.w, w) < 0) {
        Root->right = insertNode(Root->right, w,l);
    }
    else if(strcmp(Root->data.w, w) == 0) {
        Root->data.number +=1;
        node position =  SearchLinkedList(Root->data.lines,l);
        if(!position) {
            Root->data.lines = AddTail(Root->data.lines,l);
        }
    }
    else Root = insertNode(Root, w,l);
    return Root;
}



void deleteTree(TreeType Root)
{
    if(isEmpty(Root) == false){
        deleteTree(Root->left);
        deleteTree(Root->right);
        deleteLlist(Root->data.lines);
        free(Root);
    }
}

void inorderPrint(TreeType Root) // Duyệt theo thứ tự trước
{
    if(isEmpty(Root) != true){
        inorderPrint(Root->left);
        printf("%-40s %d,",Root->data.w, Root->data.number);
        Traverser(Root->data.lines);
        printf("\n");
        inorderPrint(Root->right);
    }
}
node CreateNode(int value){
    node temp; 
    temp = (node)malloc(sizeof(struct LinkedList)); 
    temp->next = NULL;
    temp->data = value; 
    return temp;
}
wNode CreateWNode(char* value){
    wNode temp;
    temp = (wNode)malloc(sizeof(struct W_LinkedList)); 
    temp->data = malloc(sizeof(char) * 30);
    temp->next = NULL;
    strcpy(temp->data,value);
    return temp;
}
node AddTail(node head, int value){
    node temp,p;
    temp = CreateNode(value);
    if(head == NULL){
        head = temp;    
    }
    else{
        p  = head;
        while(p->next != NULL){
            p = p->next;
        }
        p->next = temp;
    }
    return head;
}
wNode WAddTail(wNode head, char* value){
    wNode temp,p;
    temp = CreateWNode(value);
    if(head==NULL){
        head = temp;    
    }
    else{
        p  = head;
        while(p->next != NULL){
            p = p->next;
        }
        p->next = temp;
    }
    return head;
}
                                                                                                                                                                                                                                                                                                                                                                              
 
node SearchLinkedList(node head, int value){
	node p;
    for( p = head ; p!=NULL;p = p -> next){
        if(p->data == value)
            return p;
    }
    return NULL;
        

}
int SearchWLinkedList(wNode head, char* value){
    int position = 0;
    wNode p;
    for( p = head; p != NULL; p = p->next){
        if(strcmp(p->data,value)==0){
            return position;
        }
        ++position;
    }
    return -1;
}
 
void Traverser(node head){
	node p;
    for( p = head; p != NULL; p = p->next){
        if(p->next!=NULL)
            printf("%d,", p->data);
        else
            printf("%d", p->data);
    }
}
void WTranverser(wNode head){
    printf("\n");
    wNode p;
    for( p = head; p != NULL; p = p->next){
        printf("%s ", p->data);
    }
    printf("\n");
}
 
node InitHead(){
    node head;
    head = NULL;
    return head;
}
wNode WInitHead(){
    wNode head;
    head = NULL;
    return head;
}
 
void deleteLlist(node Root)
{
    if(Root!=NULL){
        deleteLlist(Root->next);
        free(Root);
    }
}
void deleteWLlist(wNode Root)
{
    if(Root!=NULL){
        deleteWLlist(Root->next);
        free(Root);
    }
}

int main(){
    wNode stopWordList = WInitHead();
    FILE *fptr;
    char buff[255];

    fptr = fopen("stopw.txt","r");
    if(fptr==NULL)
    {
        printf("Can't open file stopw.txt");
        exit(1);
    }
    else
    {
        while(!feof(fptr)){
            fscanf(fptr, "%s", buff);
            stopWordList=WAddTail(stopWordList,buff);
        }
    }
    fclose(fptr);
    fptr = fopen("test.txt","r");
    if(fptr==NULL){
        printf("Can't open file test.text");
        exit(1);
    }
    else
    {
        TreeType list = NULL;
        char c;
        int line =1;
        int i=0;
        int k;
        int flag = 1;
        char* word = malloc(sizeof(char) * 30);
        while((c = fgetc(fptr))!=EOF){
            if(isalpha(c)){
                word[i++]= c;
            }  
            else{
                word[i]='\0';
                if(strlen(word)>=1){
                    if(!isupper(word[0])||(isupper(word[0])&&flag==1)){
                        for( k=0;k<strlen(word);k++){
                            if(word[k] >= 'A' && word[k] <= 'Z') word[k] +=32; 
                        }
                        if(SearchWLinkedList(stopWordList,word)==-1){
                            list = insertNode(list,word,line);
                        }
                    }
                    flag = 0;
    
                }
                if(c == '.' || c == '\n'||c == '!' || c == '?') flag = 1; // flag đầu câu 
                i=0;
            }
            if(c == '\n') line++;   
        }
        inorderPrint(list);
        free(word);
        deleteTree(list);
        deleteWLlist(stopWordList);
    }
}
