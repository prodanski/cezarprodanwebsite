# On Batching in ML
*30<sup>th</sup> of July, 2025*

I have to embarrassingly admit I had this question far too long, working in Data Science.
Sure, I'd heard the usual *'it's how many datapoints[^1] your network ingests at once.* <br>  
Ok yeah thanks but **how**? Aren't computers, at their core, able to process only a single operation at a time?
<br>

## Matrix Multiplication
What follows is a simplified view of a forwardpass, and I have skipped adding biases and showing activation functions for clarity. For a better, more complete demonstration of the inner workings of a Neural Network I recommend [3Blue1Brown's YouTube Series](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi "3B1B on NN").
<br>  
### A review of what happens to a single datapoint during forwardpass through a Neural Network:
Let our first datapoint be a 2D vector:  
$\mathbf{D} = (\text{D1}, \text{D2})$.  
This datapoint is fed into the first layer of our Neural Network, and let it have 3 nodes:  
$\mathbf{N} = (\text{N1}, \text{N2}, \text{N3})$.  
Each element of our datapoint $\mathbf{D}$ is connected to each node in $\mathbf{N}$ by weights: $w_{dn}$, where $d$ is the source element of $\mathbf{D}$, and $n$ is the destination node of $\mathbf{N}$.<br>  
And, in simpler words, weight $w_{dn}$ goes from $d$ to $n$.<br>  
 
To calculate the output of our layer $\mathbf{N}$ we add[^2] all the contributions from each connection:

\\[
\begin{bmatrix}
aa & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
]\\

## Why do we do powers of 2? (SIMD vs Vector Processors)
## Why Data Science?


## Essential Tools

### Python


[^1]: In this article *datapoints* essentially mean individual rows of data.
[^2]: Note that there should be activation functions and biases too, however they would clutter the representation and are orthogonal to this exercise.
