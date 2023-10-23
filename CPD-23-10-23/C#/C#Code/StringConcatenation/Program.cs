using System;
using System.Diagnostics;
using System.Text;

// Create new stopwatch instance
Stopwatch stopwatch = new Stopwatch();

string combinedString = "";

// Begin timing
stopwatch.Start();

for (int i = 0; i < 100000; i++)
{
    combinedString += "some sample text ";  // Each += operation creates a new string in memory.
}

// Begin timing
stopwatch.Stop();

Console.WriteLine("String Concatenation Approach:");
// Write result in console
Console.WriteLine("Time elapsed: {0}", stopwatch.Elapsed);


stopwatch.Reset();

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

StringBuilder sb = new StringBuilder();

// Begin timing
stopwatch.Start();

for (int i = 0; i < 100000; i++)
{
    sb.Append("some sample text ");  // Text is appended efficiently in memory.
}

// Begin timing
stopwatch.Stop();

combinedString = sb.ToString();  // Convert the StringBuilder back to a regular string.

Console.WriteLine("StringBuilder Approach:");
// Write result in console
Console.WriteLine("Time elapsed: {0}", stopwatch.Elapsed);
