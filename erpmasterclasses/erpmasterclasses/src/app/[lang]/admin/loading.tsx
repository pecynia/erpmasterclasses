import { ReloadIcon } from "@radix-ui/react-icons"
import Container from "@/app/[lang]/components/ui/container"


const Loading = () => {
  return (
    <Container>
      <div className='flex justify-center py-5 min-h-screen'>
          <div className='bg-white p-12 rounded-lg shadow-lg w-full'>
              <div className="pt-40 flex items-center justify-center">
                  <ReloadIcon className="w-6 h-6 animate-spin" />
              </div>
          </div>
      </div>
  </Container>
  )
}

export default Loading