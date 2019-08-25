namespace :stylesheets do
  task generate: :environment do
    require 'fileutils'

    # Setup static paths for resources
    resources_dir = "#{Rails.root}/rpg-resources"
    assets_path = "#{Rails.root}/client/src/assets"
    scss_path = "#{assets_path}/scss/rpg-resources"
    images_path = "#{assets_path}/images/rpg-resources"

    # Remove all assets and build the directories cleanly.
    rebuild_folder_structure scss_path
    rebuild_folder_structure images_path

    files_in_folder(resources_dir).each do |resource_name|
      png_path = "#{resources_dir}/#{resource_name}"
      url = "~@/assets/images/rpg-resources/#{resource_name}"
      FileUtils.cp(png_path, images_path)

      width, height = IO.read(png_path)[0x10..0x18].unpack('NN')
      sprite_count_x = (width / 16).to_i
      sprite_count_y = (height / 16).to_i

      class_name = resource_name.split('.')[0]
      File.open("#{scss_path}/_#{class_name}.scss", 'w') do |file|
        # Open base class
        file.write(".#{class_name} {\n")
        file.write("\tbackground-image: url(#{url});\n")
        file.write("\twidth: $sprite-size;\n")
        file.write("\theight: $sprite-size;\n\n")

        sprite_count_x.times do |x|
          sprite_count_y.times do |y|

            # Setup classes and append a new Sprite to the sprites list
            sprite_class = "#{class_name}-#{x+1}-#{y+1}"

            # Open class and set styles
            file.write("\t&.#{sprite_class} {\n")
            file.write("\t\tbackground-position: multiply-px(#{-1*x}px, $sprite-size) multiply-px(#{-1*y}px, $sprite-size);\n")
            file.write("\t}\n\n")
          end
        end

        # Close base class
        file.write("}\n")
      end
    end
  end

  def rebuild_folder_structure(folder)
    FileUtils.rm_rf(folder)
    FileUtils.mkdir_p(folder)
  end

  def files_in_folder(folder)
    Dir.entries(folder).reject { |path| path.in?(%w[. ..]) }
  end
end