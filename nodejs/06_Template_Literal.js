var name = 'k8805';

var letter = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,'+
 '\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

 // 아래와 같이 문자를 사용하려면 ``를 사용해야한다.
 var letter = `Lorem ${name} \
 ipsum dolor sit amet, consectetur adipisicing ${1+1} elit,\
 =nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

 console.log(letter);