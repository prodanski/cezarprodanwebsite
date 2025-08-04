# On Batching in ML
*30<sup>th</sup> of July, 2025*

I have to embarrassingly admit that I had this question for far too long, working in Data Science.<br>  
**how do computers execute batching in ML?** <br>  
Sure, I'd heard the usual *'it's how many datapoints[^1] your network ingests at once.* <br>  
Ok yeah thanks but **how**? Aren't computers, at their core, able to process only a single operation at a time?

## The Mathematical  Explanation: Matrix Multiplication
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
  <img src="posts/photos/post2/2DCalcCol.svg" style="width: 80%;" alt="Data connected to the first layer of the network.">
</div>

<br>  
We recognise that this is indeed the result of the matrix multiplication $\mathbf{W} \mathbf{D}$:

<div style="text-align: center;">
  $$
\begin{bmatrix}
w_{11} & w_{21} \\
w_{12} & w_{22} \\
w_{13} & w_{23} \\
\end{bmatrix}
\begin{bmatrix}
D_{1} \\
D_{2} \\
\end{bmatrix}
=
\begin{bmatrix}
\colorbox{#FFF2CC}{$w_{11} \times D_1 + w_{21} \times D_2$} \\
\colorbox{#CCE5FF}{$w_{12} \times D_1 + w_{22} \times D_2$} \\
\colorbox{#D5E8D4}{$w_{13} \times D_1 + w_{23} \times D_2$} \\
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
  <img src="posts/photos/post2/2DFullCol2.svg" style="width: 98%;" alt="Data connected to the first layer of the network.">
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
  \colorbox{#FFF2CC}{$w_{11} \times D_1 + w_{21} \times D_2$} & \colorbox{#FAD7AC}{$w_{11} \times K_1 + w_{21} \times K_2$} \\
  \colorbox{#CCE5FF}{$w_{12} \times D_1 + w_{22} \times D_2$} & \colorbox{#7594A1}{$w_{12} \times K_1 + w_{22} \times K_2$} \\
  \colorbox{#D5E8D4}{$w_{13} \times D_1 + w_{23} \times D_2$} & \colorbox{#EDFFB5}{$w_{13} \times K_1 + w_{23} \times K_2$} \\
  \end{bmatrix}
  $$
</div>

<br>  
The resultant is also a $2 \times 3$ vector, and it becomes the input for the next neural layer.  
<br>  
<br>  
All we did was expand the input matrix into another dimension (horizontally in this representation), and process 2 datapoints simultaneously, using the same weights.  
<br>  
Matrix multiplication is the mathematical equivalent of that, and it ensures that while we process everything simultaneously, each datapoint and its resultant are orthogonal to other datapoints.
<br>  
For the gradient descent, in the same $\textit{LinAlg}$ manner, we compute the gradients for $\mathbf{D}$ and $\mathbf{K}$ simultaneously, in matrix form. These gradients are then averaged out to obtain a final gradient, used to update the weights.
<br>  
<br>  
And there we are! We have passed a dataset with $\verb|batch_size|=2$.
<br>  
<br>  

#### A note on tensors

For those among us of a physics persuasion, [a tensor is a thing that transforms like a tensor](https://www.reddit.com/r/physicsmemes/comments/s4h0dv/tensors/). But in more practical terms one could think of it as a multidimensional matrix (yeah, I said it). In this article the datapoints we examined were 2-dimensional, but as you might expect, data comes in all shapes and sizes. Whatever the dimensionality of your data, when you batch a dataset, it gains an extra dimension (along which datapoints are stacked). I suspect that's what gave rise to namings like TensorFlow, in which the inherent shape of your Dataset object is <br>  
$\verb|(batch_size, num_features)|$.


## The Physical Explanation: [SIMD](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data), I think
The correct answer I can give is "I don't really know, to be fair." The science of chip architecture, CUDA programming, and GPU manufacturing is fascinating, but extremely complex. From the research I've done to answer this, with absolutely no claim to expertise in the area, I found an answer that at least allows me to finally catch some sleep:
#### Vectorisation
is the top-level answer, which left me unsatisfied. But vectorisation is the reason why pandas dataframes are a bazillion times faster when you use them properly, and quash the impulse to do a `for` loop over the dataframe. It is also what allows computers to perform simultaneous calculations on all the elements of a vector (or matrix). <br>  
C(G)PUs have very wide registers, and multiple separate [ALUs](https://en.wikipedia.org/wiki/Arithmetic_logic_unit).  
Let us perform a very simple operation on the array $[2, 3, 4, 5]$, and add 1 to each element. Instead of looping over the array and performing 4 additions, we:
  1. Load $[2, 3, 4, 5]$ into a register
  2. Load the vector $[1, 1, 1, 1]$ into another register
  3. Execute a single SIMD ADD instruction that tells 4 separate arithmetic units to simultaneously compute:
    a. ALU1: ADD 2, 1
    b. ALU2: ADD 3, 1
    c. ALU3: ADD 4, 1
    d. ALU4: ADD 5, 1
  4. Store the resulting vector in a third register

$\verb|cited from Claude:|$ "The CPU literally has multiple arithmetic logic units (ALUs) that can operate in parallel on different parts of the wide register. It's not doing the operations sequentially - there are physically separate circuits doing the math simultaneously."

<div class="svg-container">
  <img src="https://en.algorithmica.org/hpc/simd/img/simd.png" style="width: 40%;" alt="Description" class="svg-image">
</div>

A neat observation is that these registers usually came in sizes of integer powers of 2: I suppose this might be the reason behind the tradition of having $2^{n}$ batch sizes.
In GPUs, this is scaled up even further. It is important to note that FPUs (for floating point calculations) are also a thing.  
<br>

The reality is, of course, much more complicated than that. For now I am, however, satisfied with the answer to the question  
**how do computers execute batching in ML?**



[^1]: In this article *datapoints* essentially mean individual rows of data.
[^2]: Note that there should be activation functions and biases too, however they would clutter the representation and are orthogonal to this exercise.
