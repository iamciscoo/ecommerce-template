export default function TailwindTestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Tailwind CSS Test Page</h1>
      
      <div className="max-w-2xl w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Tailwind Tests</h2>
          
          <div className="space-y-4">
            <div className="bg-red-500 text-white p-4 rounded">This should have a red background</div>
            <div className="bg-blue-500 text-white p-4 rounded">This should have a blue background</div>
            <div className="bg-green-500 text-white p-4 rounded">This should have a green background</div>
            <div className="bg-yellow-500 text-white p-4 rounded">This should have a yellow background</div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flex & Grid Tests</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Flex Test</h3>
            <div className="flex space-x-4 mb-4">
              <div className="bg-indigo-600 text-white p-4 rounded">Item 1</div>
              <div className="bg-indigo-600 text-white p-4 rounded">Item 2</div>
              <div className="bg-indigo-600 text-white p-4 rounded">Item 3</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Grid Test</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-600 text-white p-4 rounded">Grid Item 1</div>
              <div className="bg-purple-600 text-white p-4 rounded">Grid Item 2</div>
              <div className="bg-purple-600 text-white p-4 rounded">Grid Item 3</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Utility Tests</h2>
          
          <div className="space-y-4">
            <p className="font-bold">This should be bold</p>
            <p className="italic">This should be italic</p>
            <p className="underline">This should be underlined</p>
            <p className="line-through">This should have a line through it</p>
            <p className="text-xs">Extra Small Text</p>
            <p className="text-xl">Extra Large Text</p>
            <p className="uppercase">This should be uppercase</p>
            <p className="lowercase">THIS SHOULD BE LOWERCASE</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">If you can see proper styling on all the elements above, Tailwind CSS is working!</p>
        <p className="text-gray-600">If the elements look like plain HTML with minimal styling, Tailwind CSS is not being applied.</p>
      </div>
    </div>
  );
} 