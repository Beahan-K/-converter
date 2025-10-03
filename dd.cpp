
#include <iostream>
using namespace std;

class Adder {
public:
    int add(int a, int b) {
        return a + b;
    }
};

int main() {
    int num1, num2;
    cout << "Enter first number: ";
    cin >> num1;
    cout << "Enter second number: ";
    cin >> num2;

    Adder adder;
    int sum = adder.add(num1, num2);
    cout << "Sum: " << sum << endl;
    return 0;
}