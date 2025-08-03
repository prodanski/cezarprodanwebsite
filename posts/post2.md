# On Batching in ML
*30<sup>th</sup> of July, 2025*

I have to embarrassingly admit that I had this question for far too long, working in Data Science.
Sure, I'd heard the usual *'it's how many datapoints[^1] your network ingests at once.* <br>  
Ok yeah thanks but **how**? Aren't computers, at their core, able to process only a single operation at a time?
<br>

## Matrix Multiplication
What follows is a simplified view of a forwardpass, and I have skipped adding biases and showing activation functions for clarity. For a better, more complete demonstration of the inner workings of a Neural Network I recommend [3Blue1Brown's YouTube Series](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi "3B1B on NN").
<br>  
### A review of what happens to a single datapoint during forwardpass through a Neural Network:
Let our first datapoint be a 2D vector:  
$\mathbf{D} = [\text{D1}, \text{D2}]$.  
This datapoint is fed into the first layer of our Neural Network, and let it have 3 nodes: N1, N2, N3.  
Each element of our datapoint $\mathbf{D}$ is connected to each node in $\mathbf{N}$ by weights: $\mathbf{W} = [w_{dn}]$, where $d$ is the source element of $\mathbf{D}$, and $n$ is the destination node of $\mathbf{N}$.<br>  
And, in simpler words, weight $w_{dn}$ goes from $d$ to $n$.<br>  

<div style="text-align: center;">
  <img src="posts/photos/post2/1DSetup.svg" style="width: 45%;" alt="Data connected to the first layer of the network.">
</div>
 
To calculate the output of our layer $\mathbf{N}$ we sum[^2] all the contributions from each connection:

<div style="text-align: center;">
  $$
  N_n  = \sum_{d} w_{dn}\times \text{D}_{d}
  $$
</div>

<br>  
Applying this rule to each neural node we get this:<br>  

<div style="text-align: center;">
  <img src="posts/photos/post2/2DCalc.svg" style="width: 80%;" alt="Data connected to the first layer of the network.">
</div>
<br>  
We recognise that this is indeed the result of the matrix multiplication $\mathbf{W} \mathbf{D}$:

<div style="text-align: center;">
  $$
\begin{bmatrix}
\colorbox{#ffeeee}{$w_{11}$} & w_{21} \\
w_{12} & w_{22} \\
w_{13} & w_{23} \\
\end{bmatrix}
\begin{bmatrix}
D_{1} \\
D_{2} \\
\end{bmatrix}
=
\begin{bmatrix}
w_{11} \times D_1 + w_{21} \times D_2 \\
w_{12} \times D_1 + w_{22} \times D_2 \\
w_{13} \times D_1 + w_{23} \times D_2 \\
\end{bmatrix}
  $$
</div>

This resulting vector then becomes the input for the next layer in the network, and so on.
<br>  

### So what happens when we batch?
Let there be another datapoint $\mathbf{K}$. We bring $\mathbf{D}$ and $\mathbf{K}$ together, and our input becomes the $2 \times 2$ matrix $\mathbf{X}$:

<div style="text-align: center;">
  $$
  \mathbf{X} = 
  \begin{bmatrix}
  D_{1} & K_{1} \\
  D_{2} & K_{2} \\
  \end{bmatrix}
  $$
</div>
<br>

For the forward propagation of this input matrix we treat each column as an individual datapoint (which it is) and perform the procedure as before, storing each result:

<div style="text-align: center;">
  <img src="posts/photos/post2/2DFull.svg" style="width: 95%;" alt="Data connected to the first layer of the network.">
</div>

<br>  

Which, as before, is the mathematical equivalent of the matrix multiplication $\mathbf{X} \mathbf{W}$:

<div style="text-align: center;">
  $$
  \begin{bmatrix}
  w_{11} & w_{21} \\
  w_{12} & w_{22} \\
  w_{13} & w_{23} \\
  \end{bmatrix}
  \begin{bmatrix}
  D_{1} & K_1 \\
  D_{2} & K_2 \\
  \end{bmatrix}
  =
  \begin{bmatrix}
  w_{11} \times D_1 + w_{21} \times D_2 & w_{11} \times K_1 + w_{21} \times K_2\\
  w_{12} \times D_1 + w_{22} \times D_2 & w_{12} \times K_1 + w_{22} \times K_2 \\
  w_{13} \times D_1 + w_{23} \times D_2 & w_{12} \times K_1 + w_{22} \times K_2\\
  \end{bmatrix}
  $$
</div>

<br>  
The resultant is also a $2 \times 2$ vector, and it becomes the input for the next neural layer.  
All we did was expand the input matrix into another dimension (horizontally in this representation), and process 2 datapoints simultaneously, using the same weights.  
Matrix multiplication is the mathematical equivalent of that, and it ensures that while we process everything simultaneously, each datapoint and its resultant are **orthogonal** to other datapoints.
<br>  
For the gradient descent, in the same __LinAlg__ manner, we compute the gradients for $\mathbf{D}$ and $\mathbf{K}$ together, in matrix form. These gradients are then averaged out to obtain a final gradient, used to update the weights. 


## Why do we do powers of 2? (SIMD vs Vector Processors)
## Why Data Science?


## Essential Tools

### Python


[^1]: In this article *datapoints* essentially mean individual rows of data.
[^2]: Note that there should be activation functions and biases too, however they would clutter the representation and are orthogonal to this exercise.
