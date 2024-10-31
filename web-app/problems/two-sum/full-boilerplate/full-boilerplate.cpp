#include <iostream>
  #include <vector>
  #include <string>
  #include <sstream>
  
  int main() {
    std::vector<std::string> lines; // Assume input is loaded into lines
  
    int num1;
std::istringstream(lines[0]) >> num1;
  int num2;
std::istringstream(lines[1]) >> num2;
    int result = sum(num1, num2);
    std::cout << result << std::endl;
    return 0;
  }