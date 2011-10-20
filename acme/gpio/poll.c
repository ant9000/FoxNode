#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <poll.h>

int main(int argc, char *argv[]){
  struct pollfd *descriptors;
  int i,n,fd,err;
  char buf[2]={0,0};
  if(argc==1){
    printf("Usage: %s file [file ...]\n",argv[0]);
    exit(1);
  }
  n=argc-1;
  descriptors=calloc(n,sizeof(struct pollfd));
  for(i=0;i<n;i++){
    if((fd=open(argv[i+1],O_RDONLY))==-1){ err=errno; fprintf(stderr,strerror(err)); exit(1); }
    descriptors[i].fd=fd;
    descriptors[i].events=POLLPRI;
  }
  while(1){
    if(poll(descriptors,n,-1)==-1){ err=errno; fprintf(stderr,strerror(err)); exit(1); }
    for(i=0;i<n;i++){
      if(descriptors[i].revents & POLLPRI){
        fd=descriptors[i].fd;
        if(lseek(fd,0,SEEK_SET)==-1){ err=errno; fprintf(stderr,strerror(err)); exit(1); }
        if(read(fd,buf,1)==-1){ err=errno; fprintf(stderr,strerror(err)); exit(1); }
        printf("%s:%s\n",argv[i+1],buf);
        fflush(stdout);
      }
    }
  }
  return 0;
}
