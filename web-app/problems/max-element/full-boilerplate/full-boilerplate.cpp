#include <iostream>
  #include <vector>
  #include <string>
  #include <sstream>
  
  int main() {
    std::vector<std::string> lines; // Assume input is loaded into lines
  
    int size_arr;
std::istringstream(lines[0]) >> size_arr;
std::vector<int> arr(size_arr);
for (int i = 0; i < size_arr; i++) std::cin >> arr[i];
    int result = maxElement(arr);
    std::cout << result << std::endl;
    return 0;
  }