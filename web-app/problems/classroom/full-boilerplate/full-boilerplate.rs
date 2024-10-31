use std::fs::read_to_string;
  use std::io::{self};
  use std::str::Lines;
  
  fn main() -> io::Result<()> {
    let input = read_to_string("/path/to/input.txt")?;
    let mut lines = input.lines();
    let arr: Vec<_> = lines.next().unwrap().split_whitespace().map(|x| x.parse().unwrap()).collect();
    let result = classroom(arr);
    println!("{}", result);
    Ok(())
  }