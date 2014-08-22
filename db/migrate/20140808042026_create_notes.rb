class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body
      t.text :html_body
      t.boolean :public
      t.references :user, index: true

      t.timestamps
    end
  end
end
