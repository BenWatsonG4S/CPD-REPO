class Program
{
    static void Main()
    {
        // Create an instance of SomeResourceHolder. Normally, the constructor
        // would allocate the unmanaged resource.
        SomeResourceHolder resourceHolder = new SomeResourceHolder();

        // For demonstration purposes, we are forcing the garbage collection. However,
        // this is NOT recommended in production code since it can negatively impact performance.
        GC.Collect();
        GC.WaitForPendingFinalizers();

        // Keep the console window open, if running a console application.
        Console.WriteLine("Unmanaged resources have been released. Press any key to exit.");
        Console.ReadKey();
    }
}

public class SomeResourceHolder
{
    private IntPtr buffer; // Pointer to an unmanaged resource.

    public SomeResourceHolder()
    {
        // Assume buffer is allocated here.
        buffer = System.Runtime.InteropServices.Marshal.AllocHGlobal(1000);
    }

    // This finalizer is necessary because we have unmanaged resources to release.
    ~SomeResourceHolder()
    {
        // Release the unmanaged resource.
        if (buffer != IntPtr.Zero)
        {
            // Free the memory.
            System.Runtime.InteropServices.Marshal.FreeHGlobal(buffer);
            buffer = IntPtr.Zero;
        }
    }
}
