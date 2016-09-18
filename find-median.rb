def partition(arr, left, center, right, pivot_index)
  pivot = arr[pivot_index]

  arr.each_with_index do |num, i|
    if num < pivot
      left.push(num)
    elsif num > pivot
      right.push(num)
    else
      center.push(num)
    end
  end

end

def find_median(arr)
  left_count = 0
  center_count = 0
  right_count = 0
  total_length = arr.length

  loop do
    pivot_index = rand(arr.length)
    pivot = arr[pivot_index]
    left, right, center = [], [], []

    partition(arr, left, center, right, pivot_index)

    if left.length + left_count <= total_length / 2 &&
       right.length + right_count <= total_length / 2
      puts pivot
      break
    elsif left.length + left_count > right.length + right_count
      right_count += right.length + center.length
      arr = left
    elsif left.length + left_count < right.length + right_count
      left_count += left.length + center.length
      arr = right
    end

  end
end
